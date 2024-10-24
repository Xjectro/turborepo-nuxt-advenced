import UsersMeController from "./@me";
import UsersConnectionsController from "./connections";

export default class Controller {
  me = new UsersMeController();
  connections = new UsersConnectionsController();
}
