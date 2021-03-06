import * as dialogsModule from "tns-core-modules/ui/dialogs";

export function alert(message: string) {
    return dialogsModule.alert({
        title: "Assets",
        okButtonText: "OK",
        message: message
    });
}
