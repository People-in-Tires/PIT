import type {
  ChangeEmailRequest,
  ChangePasswordRequest,
  ConfirmEmailChangeRequest,
  DisableTwoFactorRequest,
  EnableTwoFactorRequest,
  LoginRequest,
  User,
  VerifyTwoFactorRequest,
} from "../types/User";

export async function getUser(id: number): Promise<User> {
  throw new Error("Not implemented");
}

export async function createUser(user: User): Promise<User> {
  throw new Error("Not implemented");
}

export async function updateUser(user: User): Promise<User> {
  throw new Error("Not implemented");
}

export async function deleteUser(id: number): Promise<void> {
  throw new Error("Not implemented");
}

export async function login(request: LoginRequest) {
  throw new Error("Not implemented");
}

export async function enableTwoFactor(request: EnableTwoFactorRequest) {
  throw new Error("Not implemented");
}

export async function disableTwoFactor(request: DisableTwoFactorRequest) {
  throw new Error("Not implemented");
}

export async function verifyTwoFactor(request: VerifyTwoFactorRequest) {
  throw new Error("Not implemented");
}

export async function changePassword(request: ChangePasswordRequest) {
  throw new Error("Not implemented");
}

export async function changeEmail(request: ChangeEmailRequest) {
  throw new Error("Not implemented");
}

export async function confirmEmailChange(request: ConfirmEmailChangeRequest) {
  throw new Error("Not implemented");
}

export async function changeUsername(username: string) {
  throw new Error("Not implemented");
}
