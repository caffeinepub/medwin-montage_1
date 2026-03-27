import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactMessage {
    name: string;
    email: string;
    message: string;
    phone: string;
}
export interface backendInterface {
    getAllContactMessages(): Promise<Array<ContactMessage>>;
    submitContactMessage(name: string, email: string, phone: string, message: string): Promise<void>;
}
