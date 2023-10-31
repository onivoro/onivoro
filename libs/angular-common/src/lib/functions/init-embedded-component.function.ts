import { TApiCredentials } from "../types/api-credentials.type";
import { stylize } from "./stylize.function";

export function initEmbeddedComponent(nativeElement: HTMLElement, credentialHandler: (credentials: TApiCredentials) => void) {
    const apiId = nativeElement.getAttribute('api-id') || '';
    const apiKey = nativeElement.getAttribute('api-key') || '';

    credentialHandler({apiId, apiKey});

    stylize(nativeElement);
}
