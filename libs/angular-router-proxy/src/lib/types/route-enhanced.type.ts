import { Route } from "@angular/router";

export type TRouteEnhanced = Route & { segments: string[], params: Record<string, any> };
