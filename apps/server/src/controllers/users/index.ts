import UsersMeController from "./@me";
import UsersConnectionsController from "./connections";
import UsersCatchingController from "./catching";

export default class Controller {
  me = new UsersMeController();
  connections = new UsersConnectionsController();
  catching = new UsersCatchingController();
}
