import applicationRepositry from "../applications/application.repositry.js";
import { AuthError, InvariantError } from "../exceptions/index.js";
const addNewApplication = async (payload, user) => {
  if (!user) throw new AuthError("invalid credentials");

  const application = await applicationRepositry.addNewApplication(payload);
  if (!application) throw new InvariantError("Gagal menambahkan application.");

  sendMessage("application_created", {
    application_id: application.id,
  });

  return application;
};

export default { addNewApplication };
