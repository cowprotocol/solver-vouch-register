export const CONTRACT_NAME = "VouchRegister";

export interface DeployArgs {
    controller: string;
    virtualCowToken: string;
}

export function constructorInput({ controller, virtualCowToken }: DeployArgs) {
    return [controller, virtualCowToken];
}