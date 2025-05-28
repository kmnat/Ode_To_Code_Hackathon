import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode } from '../game-decision-tree.component'; // Adjust path as needed

export interface DisplayNode extends TreeNode {
  id: string;
  children?: DisplayNode[];
  depth: number;
  isCurrent?: boolean;
  isOnPath?: boolean;
  yesTraversed?: boolean;
  noTraversed?: boolean;
}

@Component({
  selector: 'app-tree-visualizer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tree-visualizer.component.html',
  styleUrl: './tree-visualizer.component.scss'
})
export class TreeVisualizerComponent implements OnChanges {
  @Input() treeData!: TreeNode;
  @Input() currentNode!: TreeNode;
  @Input() gameHistory!: TreeNode[];
  @Input() visitedChoices!: Map<TreeNode, { yesTraversed?: boolean; noTraversed?: boolean }>;

  displayTree: DisplayNode | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.treeData && (changes['treeData'] || changes['currentNode'] || changes['gameHistory'] || changes['visitedChoices'])) {
      this.displayTree = this.buildDisplayTree(this.treeData, 0);
    }
  }

  private buildDisplayTree(node: TreeNode, depth: number, path: TreeNode[] = []): DisplayNode {
    const nodeId = this.generateNodeId(node, depth);
    const choices = this.visitedChoices?.get(node);

    const displayNode: DisplayNode = {
      ...node,
      id: nodeId,
      depth: depth,
      isCurrent: node === this.currentNode,
      isOnPath: this.gameHistory?.includes(node),
      yesTraversed: choices?.yesTraversed,
      noTraversed: choices?.noTraversed,
      children: []
    };

    const currentPath = [...path, node];

    if (node.yesNode) {
      displayNode.children?.push(this.buildDisplayTree(node.yesNode, depth + 1, currentPath));
    }
    if (node.noNode) {
      displayNode.children?.push(this.buildDisplayTree(node.noNode, depth + 1, currentPath));
    }
    return displayNode;
  }

  private generateNodeId(node: TreeNode, depth: number): string {
    // Simple ID generator based on question and depth to avoid collisions
    return `${depth}-${node.question.substring(0, 10).replace(/\s+/g, '-')}`;
  }

  // Helper to pass to template for recursive rendering
  trackByNodeId(index: number, node: DisplayNode): string {
    return node.id;
  }
} 