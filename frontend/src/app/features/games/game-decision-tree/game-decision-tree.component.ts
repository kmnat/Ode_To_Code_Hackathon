import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { trigger, transition, style, animate } from '@angular/animations';

export interface TreeNode {
  question: string;
  type: 'question' | 'action';
  yesNode?: TreeNode;
  noNode?: TreeNode;
  yesChoiceCompleted?: boolean;
  noChoiceCompleted?: boolean;
}

@Component({
  selector: 'app-game-decision-tree',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './game-decision-tree.component.html',
  styleUrl: './game-decision-tree.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class GameDecisionTreeComponent implements OnInit, OnDestroy {
  decisionTree: TreeNode = {
    question: 'Do you have a personal trading or demat account?',
    type: 'question',
    yesNode: {
      question: 'Is the account with a non-Citi approved third-party broker (e.g., Zerodha)?',
      type: 'question',
      yesNode: {
        question: 'Do you have holdings (shares, securities) in this third-party account?',
        type: 'question',
        yesNode: {
          question: 'Transfer shares to a Citi-approved broker OR sell them, then close the account. Disclose this account on CoFY within 30 days.',
          type: 'action'
        },
        noNode: {
          question: 'Close this third-party account within 60 days. Required actions: Upload closure document, final statement (zero balance), and mark account as closed in CoFY. Disclose this account on CoFY within 30 days.',
          type: 'action'
        }
      },
      noNode: {
        question: 'Is this personal trading account held with a Citi-approved broker (e.g., HDFC Securities, Kotak Securities)?',
        type: 'question',
        yesNode: {
          question: 'For accounts with Citi-approved brokers (e.g., HDFC, Kotak): Obtain pre-clearance for transactions and execute them within T+1 trading days.',
          type: 'action'
        }
      }
    },
    noNode: {
      question: 'If you do not have any personal trading or demat accounts, no further action is required regarding this policy.',
      type: 'action'
    }
  };

  currentNode: TreeNode = this.decisionTree;
  gameHistory: TreeNode[] = [this.currentNode];
  isGameComplete = false;
  visitedChoices = new Map<TreeNode, { yesTraversed?: boolean; noTraversed?: boolean }>();
  allPathsTraversed = false;
  private visitedEndpoints = new Set<TreeNode>();
  private totalEndpoints = 0;
  fullTreeTextLines: { text: string, level: number, type: 'question' | 'action' }[] = [];

  // Timer properties
  timerInterval: any;
  elapsedSeconds: number = 0;
  timerDisplay: string = '00:00';

  constructor() {
    this.initializeTreeCompletionStatus(this.decisionTree);
    this.totalEndpoints = this.countAllPossibleEndpoints(this.decisionTree);
    // console.log('[DecisionTree] Total Endpoints Calculated:', this.totalEndpoints);
  }

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer(); // Ensure timer stops when component is destroyed
  }

  startTimer(): void {
    this.stopTimer(); // Clear any existing timer before starting a new one
    this.elapsedSeconds = 0;
    this.timerDisplay = this.formatTime(this.elapsedSeconds);
    this.timerInterval = setInterval(() => {
      this.elapsedSeconds++;
      this.timerDisplay = this.formatTime(this.elapsedSeconds);
    }, 1000);
    // console.log('[DecisionTree Timer] Timer started.');
  }

  stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null; // Clear the interval ID
      // console.log('[DecisionTree Timer] Timer stopped. Final time:', this.timerDisplay);
    }
  }

  resetTimer(): void {
    this.stopTimer();
    this.elapsedSeconds = 0;
    this.timerDisplay = '00:00';
    // Typically, restartGame would call startTimer after resetting other game states.
  }

  formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');
    return `${paddedMinutes}:${paddedSeconds}`;
  }

  wasPreviousChoiceYes(index: number): boolean {
    if (index === 0 || index >= this.gameHistory.length) {
      return false; // No previous choice for the first node or out of bounds
    }
    const previousNode = this.gameHistory[index - 1];
    const currentNode = this.gameHistory[index];
    return previousNode.yesNode === currentNode;
  }

  makeChoice(choice: 'yes' | 'no'): void {
    const currentChoices = this.visitedChoices.get(this.currentNode) || {};
    if (choice === 'yes') {
      currentChoices.yesTraversed = true;
    } else {
      currentChoices.noTraversed = true;
    }
    this.visitedChoices.set(this.currentNode, currentChoices);
    // console.log('[DecisionTree DEBUG] makeChoice - Node:', this.currentNode.question, 'Choice:', choice, 'Updated visitedChoices for this node:', currentChoices);
    // console.log('[DecisionTree DEBUG] makeChoice - Full visitedChoices Map:', this.visitedChoices);

    const nextNode = choice === 'yes' ? this.currentNode.yesNode : this.currentNode.noNode;
    
    if (nextNode) {
      this.currentNode = nextNode;
      this.gameHistory.push(this.currentNode);
      
      if (this.currentNode.type === 'action') {
        this.isGameComplete = true;
        this.visitedEndpoints.add(this.currentNode);
        // console.log('[DecisionTree] Action Node Reached. Visited Endpoints Size:', this.visitedEndpoints.size, 'Node:', this.currentNode.question);
        this.updateAncestorCompletionStatus();
        this.checkIfAllPathsTraversed();
      } else {
        this.isGameComplete = false;
      }
    }
  }

  restartGame(): void {
    this.currentNode = this.decisionTree;
    this.initializeTreeCompletionStatus(this.decisionTree);
    this.gameHistory = [this.currentNode];
    this.isGameComplete = false;
    this.visitedChoices.clear();
    this.visitedEndpoints.clear();
    this.allPathsTraversed = false;
    this.fullTreeTextLines = [];
    this.startTimer();
  }

  goBack(): void {
    if (this.gameHistory.length > 1) {
      this.gameHistory.pop();
      const newCurrentNode = this.gameHistory[this.gameHistory.length - 1];
      // Create a new object reference for currentNode to help Angular's change detection
      this.currentNode = { ...newCurrentNode }; 
      this.isGameComplete = false;
      // It might also be beneficial to log the state of the choiceCompleted flags here for the new currentNode
      // console.log(`[DecisionTree DEBUG] GoBack - New currentNode: "${this.currentNode.question}"`);
      // console.log(`[DecisionTree DEBUG] GoBack - yesChoiceCompleted: ${this.currentNode.yesChoiceCompleted}, noChoiceCompleted: ${this.currentNode.noChoiceCompleted}`);
    }
  }

  hasChoiceBeenTraversed(choice: 'yes' | 'no'): boolean {
    // console.log(`[DecisionTree DEBUG] hasChoiceBeenTraversed - Checking for Node: "${this.currentNode.question}", Choice: "${choice}"`);
    const choices = this.visitedChoices.get(this.currentNode);
    if (!choices) {
      // console.log('[DecisionTree DEBUG] hasChoiceBeenTraversed - No choices found in visitedChoices map for this node.');
      return false;
    }
    const traversed = choice === 'yes' ? choices.yesTraversed === true : choices.noTraversed === true;
    // console.log('[DecisionTree DEBUG] hasChoiceBeenTraversed - Choices found in map:', choices, `Result for "${choice}":`, traversed);
    return traversed;
  }

  /**
   * Checks if all leaf nodes reachable from the given choice ('yes' or 'no')
   * from the current node have been visited.
   */
  areAllLeafNodesOfChoiceCompleted(choice: 'yes' | 'no'): boolean {
    const startingNodeForChoice = (choice === 'yes') ? this.currentNode.yesNode : this.currentNode.noNode;

    if (!startingNodeForChoice) {
      // If the choice leads to no node (e.g., a question only has a 'no' path, and we're checking 'yes'),
      // then this path doesn't exist, so consider it "completed" to disable the button.
      // console.log(`[DecisionTree DEBUG] areAllLeafNodesOfChoiceCompleted - Node: "${this.currentNode.question}", Choice: "${choice}" - No starting node for choice. Path considered completed.`);
      return true;
    }

    // If the choice itself directly leads to an action node
    if (startingNodeForChoice.type === 'action') {
      const completed = this.visitedEndpoints.has(startingNodeForChoice);
      // console.log(`[DecisionTree DEBUG] areAllLeafNodesOfChoiceCompleted - Node: "${this.currentNode.question}", Choice: "${choice}" leads directly to action "${startingNodeForChoice.question}". Completed: ${completed}`);
      return completed;
    }

    // If the choice leads to a question node, find all leaves from there
    const reachableLeafNodes = this.getAllLeafNodesFrom(startingNodeForChoice);

    if (reachableLeafNodes.size === 0) {
      // This implies a path that's a question but doesn't lead to any action nodes.
      // Such a path cannot be "completed" in terms of visiting all its endpoints.
      // It might be an incompletely defined tree branch.
      // console.warn(`[DecisionTree DEBUG] areAllLeafNodesOfChoiceCompleted - Node: "${this.currentNode.question}", Choice: "${choice}" leads to subtree starting with "${startingNodeForChoice.question}" which has NO leaf nodes. Path considered NOT completed.`);
      return false; 
    }

    let allFound = true;
    for (const leafNode of reachableLeafNodes) {
      if (!this.visitedEndpoints.has(leafNode)) {
        allFound = false;
        // console.log(`[DecisionTree DEBUG] areAllLeafNodesOfChoiceCompleted - Node: "${this.currentNode.question}", Choice: "${choice}". Leaf node "${leafNode.question}" (from subtree of "${startingNodeForChoice.question}") NOT found in visitedEndpoints.`);
        break;
      }
    }
    // console.log(`[DecisionTree DEBUG] areAllLeafNodesOfChoiceCompleted - Node: "${this.currentNode.question}", Choice: "${choice}" (subtree from "${startingNodeForChoice.question}" with ${reachableLeafNodes.size} leaves). All leaves completed: ${allFound}`);
    return allFound;
  }

  /**
   * Collects all unique leaf (action) nodes reachable from a given starting node.
   * Uses a BFS-like approach to traverse the sub-tree.
   */
  private getAllLeafNodesFrom(startNode: TreeNode | undefined): Set<TreeNode> {
    const allLeaves = new Set<TreeNode>();
    if (!startNode) {
      return allLeaves;
    }

    const queue: TreeNode[] = [startNode];
    // visitedInThisSearch prevents re-processing nodes if multiple paths lead to them *within this specific search*,
    // and handles potential cycles if the tree structure allowed them (though ours is a DAG).
    const visitedInThisSearch = new Set<TreeNode>();

    while (queue.length > 0) {
      const currentNode = queue.shift()!;

      if (visitedInThisSearch.has(currentNode)) {
        continue;
      }
      visitedInThisSearch.add(currentNode);

      if (currentNode.type === 'action') {
        allLeaves.add(currentNode);
      } else {
        // It's a question node, add its children to the queue if they exist
        if (currentNode.yesNode) {
          queue.push(currentNode.yesNode);
        }
        if (currentNode.noNode) {
          queue.push(currentNode.noNode);
        }
      }
    }
    return allLeaves;
  }

  private countAllPossibleEndpoints(node: TreeNode | undefined): number {
    const uniqueActionNodes = new Set<TreeNode>();
    function findUniqueActionsRecursive(currentNode: TreeNode | undefined, visitedInTraversal = new Set<TreeNode>()) {
      if (!currentNode || visitedInTraversal.has(currentNode)) {
        return;
      }
      visitedInTraversal.add(currentNode); // Marks node as visited for the current path to avoid cycles

      if (currentNode.type === 'action') {
        uniqueActionNodes.add(currentNode); // Add to the main set of unique action nodes
        // Do not return here if an action node could theoretically have children in some other tree structure
        // Though in this specific case, action nodes are terminal.
      }

      // Explore children
      if (currentNode.yesNode) {
        findUniqueActionsRecursive(currentNode.yesNode, new Set(visitedInTraversal));
      }
      if (currentNode.noNode) {
        findUniqueActionsRecursive(currentNode.noNode, new Set(visitedInTraversal));
      }
    }

    findUniqueActionsRecursive(node); // Start the recursive search from the root
    return uniqueActionNodes.size;
  }
  
  private checkIfAllPathsTraversed(): void {
    // console.log('[DecisionTree] Checking if all paths traversed. Visited:', this.visitedEndpoints.size, 'Total:', this.totalEndpoints);
    if (this.visitedEndpoints.size >= this.totalEndpoints && !this.allPathsTraversed) {
      // console.log('[DecisionTree] All paths traversed condition MET!');
      this.allPathsTraversed = true;
      this.stopTimer(); // Stop timer when game is complete
      // console.log('[DecisionTree] Calling generateFullTreeTextRepresentation.');
      this.generateFullTreeTextRepresentation();
    }
  }

  private generateFullTreeTextRepresentation(): void {
    // console.log('[DecisionTree] generateFullTreeTextRepresentation called.');
    this.fullTreeTextLines = [];
    this._buildTreeLines(this.decisionTree, 0, this.fullTreeTextLines);
    // console.log('[DecisionTree] fullTreeTextLines populated:', JSON.stringify(this.fullTreeTextLines)); // Stringify for better console view
  }

  private _buildTreeLines(node: TreeNode | undefined, level: number, lines: { text: string, level: number, type: 'question' | 'action' }[]): void {
    if (!node) {
      return;
    }

    let prefix = '';
    if (level > 0) {
        // Check if this node is a 'yes' or 'no' child of its parent to add the prefix
        // This requires knowing the parent, which this simple traversal doesn't easily provide without passing more info.
        // For simplicity, we'll just indent based on level for now.
        // A more complex prefix like "YES ->" or "NO ->" would require parent tracking.
    }

    lines.push({ 
        text: `${prefix}${node.question}`,
        level: level, 
        type: node.type 
    });

    if (node.yesNode) {
        lines.push({ text: `  YES branch:`, level: level + 1, type: 'question'}); // Indicate branch start
        this._buildTreeLines(node.yesNode, level + 2, lines);
    }
    if (node.noNode) {
        lines.push({ text: `  NO branch:`, level: level + 1, type: 'question'}); // Indicate branch start
        this._buildTreeLines(node.noNode, level + 2, lines);
    }
  }

  private initializeTreeCompletionStatus(node: TreeNode | undefined): void {
    if (!node) {
      return;
    }
    node.yesChoiceCompleted = false;
    node.noChoiceCompleted = false;

    if (node.type === 'question') {
      this.initializeTreeCompletionStatus(node.yesNode);
      this.initializeTreeCompletionStatus(node.noNode);
    }
  }

  private updateAncestorCompletionStatus(): void {
    // console.log("[DecisionTree DEBUG] updateAncestorCompletionStatus - Starting update.");
    // Iterate from the parent of the current leaf node upwards
    for (let i = this.gameHistory.length - 2; i >= 0; i--) {
      const ancestorNode = this.gameHistory[i];
      // const choiceMadeFromAncestor = this.gameHistory[i+1]; // This is the node chosen from the ancestor

      // console.log(`[DecisionTree DEBUG] updateAncestorCompletionStatus - Checking ancestor: "${ancestorNode.question}"`);

      // Check and update completion for the 'yes' choice of the ancestor
      if (ancestorNode.yesNode) {
        if (ancestorNode.yesNode.type === 'action') {
          ancestorNode.yesChoiceCompleted = this.visitedEndpoints.has(ancestorNode.yesNode);
          // console.log(`[DecisionTree DEBUG] updateAncestorCompletionStatus - Ancestor "${ancestorNode.question}", yesNode is action "${ancestorNode.yesNode.question}". Completed: ${ancestorNode.yesChoiceCompleted}`);
        } else {
          const yesSubtreeLeaves = this.getAllLeafNodesFrom(ancestorNode.yesNode);
          if (yesSubtreeLeaves.size > 0) {
            let allYesLeavesVisited = true;
            for (const leaf of yesSubtreeLeaves) {
              if (!this.visitedEndpoints.has(leaf)) {
                allYesLeavesVisited = false;
                break;
              }
            }
            ancestorNode.yesChoiceCompleted = allYesLeavesVisited;
            // console.log(`[DecisionTree DEBUG] updateAncestorCompletionStatus - Ancestor "${ancestorNode.question}", yesNode leads to subtree. Leaves: ${yesSubtreeLeaves.size}. All visited: ${ancestorNode.yesChoiceCompleted}`);
          } else {
            ancestorNode.yesChoiceCompleted = false; 
            // console.warn(`[DecisionTree DEBUG] updateAncestorCompletionStatus - Ancestor "${ancestorNode.question}", yesNode leads to a subtree with NO leaves. Marked as not completed.`);
          }
        }
      } else {
        ancestorNode.yesChoiceCompleted = true;
        // console.log(`[DecisionTree DEBUG] updateAncestorCompletionStatus - Ancestor "${ancestorNode.question}" has no yesNode. yesChoiceCompleted set to true.`);
      }

      // Check and update completion for the 'no' choice of the ancestor
      if (ancestorNode.noNode) {
        if (ancestorNode.noNode.type === 'action') {
          ancestorNode.noChoiceCompleted = this.visitedEndpoints.has(ancestorNode.noNode);
          // console.log(`[DecisionTree DEBUG] updateAncestorCompletionStatus - Ancestor "${ancestorNode.question}", noNode is action "${ancestorNode.noNode.question}". Completed: ${ancestorNode.noChoiceCompleted}`);
        } else {
          const noSubtreeLeaves = this.getAllLeafNodesFrom(ancestorNode.noNode);
          if (noSubtreeLeaves.size > 0) {
            let allNoLeavesVisited = true;
            for (const leaf of noSubtreeLeaves) {
              if (!this.visitedEndpoints.has(leaf)) {
                allNoLeavesVisited = false;
                break;
              }
            }
            ancestorNode.noChoiceCompleted = allNoLeavesVisited;
            // console.log(`[DecisionTree DEBUG] updateAncestorCompletionStatus - Ancestor "${ancestorNode.question}", noNode leads to subtree. Leaves: ${noSubtreeLeaves.size}. All visited: ${ancestorNode.noChoiceCompleted}`);
          } else {
            ancestorNode.noChoiceCompleted = false;
             // console.warn(`[DecisionTree DEBUG] updateAncestorCompletionStatus - Ancestor "${ancestorNode.question}", noNode leads to a subtree with NO leaves. Marked as not completed.`);
          }
        }
      } else {
        ancestorNode.noChoiceCompleted = true;
        // console.log(`[DecisionTree DEBUG] updateAncestorCompletionStatus - Ancestor "${ancestorNode.question}" has no noNode. noChoiceCompleted set to true.`);
      }
    }
    // console.log("[DecisionTree DEBUG] updateAncestorCompletionStatus - Finished update.");
  }
}
