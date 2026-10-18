import type { getLinkedAccounts } from "./data";

export type LinkedAccountStatus = Awaited<ReturnType<typeof getLinkedAccounts>>;
