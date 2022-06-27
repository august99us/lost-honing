import React, { PureComponent, ReactNode } from 'react';
import { Gear, TreeNode, Comparable } from './../../types/global.d';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { v4 as uuidv4 } from 'uuid';

interface Props {
    children?: ReactNode;
    gear: Gear[];
}

class Selectable<T extends Comparable<T>> implements Comparable<Selectable<T>> {
    value: T;
    isSelectable: boolean;
    constructor(value: T, isSelectable: boolean) {
        this.value = value;
        this.isSelectable = isSelectable;
    }
    public compareTo(value: Selectable<T>) {
        return this.value.compareTo(value.value);
    }
}

interface State {
    error: Error | null;
    errorInfo: { componentStack: string } | null;
    gearTree: TreeNode<Selectable<Gear>>;
}

/**
 * jkfdls
 */
export default class GearSelector extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        const rootNode: TreeNode<Selectable<Gear>> = new TreeNode<
            Selectable<Gear>
        >(new Selectable(new Gear('rootGear', 'rootGear'), false));
        for (const gear of props.gear) {
            if (!gear.categoryPath) {
                // If the gear doesn't have a category path (for some reason), just add it at the root level
                rootNode.getOrCreateChildForValue(new Selectable(gear, true));
            } else {
                let currentNode: TreeNode<Selectable<Gear>> = rootNode;
                for (const categoryLevel of gear.categoryPath) {
                    // categoryPath is a list of categories that we want to filter
                    // by, like ["T1", "IL302"]. This is represented in the tree
                    // structure by the path we are taking down the tree.
                    // we are representing each category level as an unselectable gear element with category level
                    // set as the id and the label of the gear.
                    currentNode = currentNode.getOrCreateChildForValue(
                        new Selectable(
                            new Gear(categoryLevel, categoryLevel),
                            false
                        )
                    );
                }
                // Now that we've traversed the tree with the category path, add the gear as a leaf node.
                currentNode.getOrCreateChildForValue(
                    new Selectable(gear, true)
                );
            }
        }

        this.state = {
            error: null,
            errorInfo: null,
            gearTree: rootNode,
        };
    }

    componentDidCatch(
        error: Error,
        errorInfo: { componentStack: string }
    ): void {
        // Catch errors in any components below and re-render with error message
        this.setState({ error, errorInfo });

        // You can also log error messages to an error reporting service here
    }

    render() {
        const { children } = this.props;
        const { error, errorInfo, gearTree } = this.state;

        console.log(JSON.stringify(gearTree));
        console.log(gearTree.isLeafNode);

        const createTreeItems = (treeNodes: TreeNode<Selectable<Gear>>[]) => {
            return treeNodes.map((node) => {
                let treeItem;
                if (node.isLeafNode()) {
                    console.log('hello');
                    treeItem = (
                        <TreeItem
                            nodeId={
                                node.value.isSelectable
                                    ? node.value.value.id
                                    : uuidv4()
                            }
                            label={node.value.value.label}
                        />
                    );
                } else {
                    console.log('hi');
                    treeItem = (
                        <TreeItem
                            nodeId={
                                node.value.isSelectable
                                    ? node.value.value.id
                                    : uuidv4()
                            }
                            label={node.value.value.label}
                        >
                            {createTreeItems(node.children)}
                        </TreeItem>
                    );
                }

                return treeItem;
            });
        };

        const treeItems = createTreeItems(gearTree.children);

        return (
            <TreeView
                aria-label="gearNavigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{
                    height: 240,
                    flexGrow: 1,
                    maxWidth: 400,
                    overflowY: 'auto',
                }}
                onNodeSelect={() => console.log('Yoyoyoyoyoyo')}
            >
                {treeItems}
            </TreeView>
        );
    }
}
