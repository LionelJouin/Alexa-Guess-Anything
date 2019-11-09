// export * from "./fr-FR";
import { fr_FR } from "./fr-FR";

export default function (language: string) {
    switch (language) {
        case "fr-FR":
            return fr_FR;
        default:
            return fr_FR;
    }
}
