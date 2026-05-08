class Listener {
  constructor(applicationService, mailSender) {
    this._applicationService = applicationService;
    this._mailSender = mailSender;
  }

  async listen(msg) {
    try {
      const { application_id } = JSON.parse(msg.content.toString());

      const data =
        await this._applicationService.getApplicationWithJobOwner(
          application_id,
        );

      await this._mailSender.sendEmail(data.owner_email, {
        applicantEmail: data.applicant_email,
        applicantName: data.applicant_name,
        appliedAt: data.applied_at,
      });

      console.log(
        `Email notifikasi terkirim ke job owner: ${data.owner_email}`,
      );
    } catch (error) {
      console.error("Gagal memproses message:", error.message);
      throw error;
    }
  }
}

export default Listener;
