declare module "npm:hono" {
  export class Hono {
    constructor();
    get(path: string, handler: (ctx: any) => any): this;
    post(path: string, handler: (ctx: any) => any): this;
    put(path: string, handler: (ctx: any) => any): this;
    delete(path: string, handler: (ctx: any) => any): this;
    fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
  }
}

declare module "npm:hono/cors" {
  export function cors(): (ctx: any, next: () => Promise<void>) => Promise<void>;
}

declare module "npm:hono/logger" {
  export function logger(): (ctx: any, next: () => Promise<void>) => Promise<void>;
}
