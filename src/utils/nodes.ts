import { NodesObject, NodeElement, NodeList } from "../types/Node";

export const convertNodesObjectToArray = (
  nodesObj: NodesObject | undefined
): NodeList => {
  if (nodesObj) {
    return Object.keys(nodesObj).map((key) => ({
      id: key,
      ...nodesObj[key],
    }));
  }

  return [];
};

export const findParentNode = (
  nodes: NodeList = [],
  childId = ""
): NodeElement | undefined =>
  nodes.find((node: NodeElement) => node.adjList.includes(childId));

export const findRootNode = (
  nodeList: NodeList = []
): NodeElement | undefined =>
  nodeList.find((node: NodeElement) => !findParentNode(nodeList, node.id));

export const generateBranch = (
  nodeList: NodeList,
  currentNodeId: string
): string[] => {
  const rootId = findRootNode(nodeList)?.id;
  let branch = [currentNodeId];
  let parentId = findParentNode(nodeList, currentNodeId)?.id;

  if (parentId) {
    branch = [...branch, parentId];

    while (parentId !== rootId) {
      parentId = findParentNode(nodeList, parentId)?.id;

      if (parentId) {
        branch = [...branch, parentId];
      }
    }
  }

  return branch.reverse();
};

export const generateBranches = (nodeList: NodeList): Array<string[]> => {
  let branches: Array<string[]> = [];
  const leafs = nodeList.filter(
    (node: NodeElement): boolean => !node.adjList.length
  );

  leafs.forEach((leaf) => {
    const branch = generateBranch(nodeList, leaf.id);
    branches = [...branches, branch];
  });

  return branches;
};
