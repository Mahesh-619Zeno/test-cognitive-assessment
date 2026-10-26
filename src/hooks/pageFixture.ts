import { Page } from "@playwright/test";

class PageFixture {
    page!: Page;
    private componentType?: string;

    /**
     * Stores the component type (e.g. "Assessment" or "Workflow") for the current scenario.
     */
    setComponentType(type: string): void {
        this.componentType = type;
    }

    /**
     * Returns the stored component type.
     * Throws an Error when the component type has not been set in the current scenario.
     */
    getComponentType(): string {
        if (this.componentType === undefined) {
            throw new Error("Component type is not set. Use the 'User sets component type' step first.");
        }
        return this.componentType;
    }
}

export const pageFixture = new PageFixture();