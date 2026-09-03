import { ComponentType } from "react";

const views = new Map<string, ComponentType>();

export function registerView(id: string, component: ComponentType) {
  views.set(id, component);
}

export function getView(id: string): ComponentType | undefined {
  return views.get(id);
}

export function getAllViewIds(): string[] {
  return Array.from(views.keys());
}