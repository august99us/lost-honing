// declare module 'Foo' {
//     // Some variable declarations
//     export type Bar = string | number; /*sample*/
// }
export class Gear implements Comparable<Gear> {
    id: string;
    label: string;
    categoryPath?: string[];

    constructor(id: string, label: string, categoryPath?: string[]) {
        this.id = id;
        this.label = label;
        if (categoryPath) {
            this.categoryPath = categoryPath;
        }
    }

    public compareTo(value: Gear) {
        return this.label.localeCompare(value.label);
    }
}

export interface Comparable<T> {
    compareTo(value: T): number;
}

export class TreeNode<T extends Comparable> {
    value: T;
    children: TreeNode<T>[];

    constructor(value: T) {
        this.value = value;
        this.children = [];
    }

    public getOrCreateChildForValue(value: T) {
        for (const child of this.children) {
            console.log(
                'child.value is ' +
                    JSON.stringify(child.value) +
                    ' . value is ' +
                    JSON.stringify(value) +
                    ' . their equality is ' +
                    JSON.stringify(child.value.compareTo(value))
            );
            if (child.value.compareTo(value) === 0) {
                return child;
            }
        }
        const newChild: TreeNode<T> = new TreeNode<T>(value);
        this.children.push(newChild);
        this.children.sort((v1, v2) => {
            // I know, i can just use an autosorted list of some sort
            return v1.value.compareTo(v2.value); // too lazy to figure out how to do that in tsx
        });
        return newChild;
    }

    public isLeafNode() {
        if (this.children) {
            console.log(this.children.length);
            return this.children.length < 1;
        }
    }
}
