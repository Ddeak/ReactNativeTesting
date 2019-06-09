import { schema } from "./schema";

const MY_INSTANCE_ADDRESS = "odinshall.de1a.cloud.realm.io";
export const SERVER_URL = `https://${MY_INSTANCE_ADDRESS}`;

let realm: any;

export const loginRealm = async () => {
    try {
        if (realm) return realm;

        const user = await Realm.Sync.User.login(
            SERVER_URL,
            "Daniel",
            "VFEsDdubh5UDDzk"
        );
        const config = user.createConfiguration({
            schema: schema,
        });

        realm = await Realm.open(config);
        return realm;
    } catch (err) {
        return new Realm({
            schema: schema,
        });
    }
};
