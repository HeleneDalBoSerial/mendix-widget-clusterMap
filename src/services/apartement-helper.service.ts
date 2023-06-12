import { Appartment } from "src/models/appartment.model";
import { AppartmentsCluster } from "src/models/appartments-cluster.model";
import { ListValue } from "mendix";

export function appartmentsToCityClusters(listValue: ListValue): AppartmentsCluster[] {
    const result = [] as AppartmentsCluster[];

    if (listValue.items && listValue.items.length > 0) {
        listValue.items.forEach(item => {
            const appart = item.id as any;
            const cityIndex = result.findIndex(a => a.city.toLowerCase().trim() === appart.city.toLowerCase().trim());

            if (cityIndex > -1) {
                result[cityIndex].appartments.push(appart);
            } else {
                result.push({
                    city: appart.city,
                    appartments: [appart]
                });
            }
        });
    }

    return result;
}
