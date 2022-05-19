import * as Utils from "./nodes";

import { NodeType } from "../types/Node";

describe("Node utilitary functions", () => {
  describe("#findParentNode", () => {
    describe("return the node", () => {
      it("when one of the nodes contain it as a leaf", () => {
        const mockNodeList = [
          { id: "1", adjList: [], label: "1", value: 50, type: NodeType.BASIC },
          {
            id: "2",
            adjList: ["1", "3"],
            label: "2",
            value: 80,
            type: NodeType.BASIC,
          },
          { id: "3", adjList: [], label: "3", value: 20, type: NodeType.BASIC },
        ];
        jest.spyOn(Utils, "findRootNode").mockReturnValue({
          id: "2",
          adjList: ["1", "3"],
          label: "2",
          value: 80,
          type: NodeType.BASIC,
        });

        const parentNode = Utils.findParentNode(mockNodeList, "1");
        expect(parentNode).toBeDefined();
        expect(parentNode?.id).toBe("2");
      });
    });

    describe("return undefined", () => {
      it("when node is root", () => {
        const mockNodeList = [
          { id: "1", adjList: [], label: "1", value: 50, type: NodeType.BASIC },
          {
            id: "2",
            adjList: ["1", "3"],
            label: "2",
            value: 80,
            type: NodeType.BASIC,
          },
          { id: "3", adjList: [], label: "3", value: 20, type: NodeType.BASIC },
        ];
        jest.spyOn(Utils, "findRootNode").mockReturnValue({
          id: "2",
          adjList: ["1", "3"],
          label: "2",
          value: 80,
          type: NodeType.BASIC,
        });
        expect(Utils.findParentNode(mockNodeList, "2")).toBe(undefined);
      });
    });
  });

  describe("#findRootNode", () => {
    describe("return the node", () => {
      it("when none of the nodes contain it as a leaf", () => {
        const mockNodeList = [
          { id: "1", adjList: [], label: "1", value: 50, type: NodeType.BASIC },
          {
            id: "2",
            adjList: ["1", "3"],
            label: "2",
            value: 80,
            type: NodeType.BASIC,
          },
          { id: "3", adjList: [], label: "3", value: 20, type: NodeType.BASIC },
        ];
        jest.spyOn(Utils, "findRootNode").mockReturnValue({
          id: "2",
          adjList: ["1", "3"],
          label: "2",
          value: 80,
          type: NodeType.BASIC,
        });

        const rootNode = Utils.findRootNode(mockNodeList);
        expect(rootNode).toBeDefined();
        expect(rootNode?.id).toBe("2");
      });
    });

    describe("return undefined", () => {
      it("when root node cannot be found", () => {
        const mockNodeList = [
          {
            id: "1",
            adjList: ["2"],
            label: "1",
            value: 50,
            type: NodeType.BASIC,
          },
          {
            id: "2",
            adjList: ["1"],
            label: "2",
            value: 80,
            type: NodeType.BASIC,
          },
        ];
        jest.spyOn(Utils, "findRootNode").mockReturnValue(undefined);
        expect(Utils.findRootNode(mockNodeList)).toBe(undefined);
      });
    });
  });

  describe("#generateBranch", () => {
    const mockNodeList = [
      { id: "1", adjList: ["4"], label: "1", value: 50, type: NodeType.BASIC },
      {
        id: "2",
        adjList: ["1", "3"],
        label: "2",
        value: 80,
        type: NodeType.BASIC,
      },
      { id: "3", adjList: ["5"], label: "3", value: 66, type: NodeType.BASIC },
      {
        id: "4",
        adjList: ["6", "7"],
        label: "4",
        value: 84,
        type: NodeType.SERVICE,
      },
      { id: "5", adjList: [], label: "5", value: 32, type: NodeType.SERVICE },
      {
        id: "6",
        adjList: ["8"],
        label: "6",
        value: 15,
        type: NodeType.SERVICE,
      },
      { id: "7", adjList: [], label: "7", value: 40, type: NodeType.SERVICE },
      { id: "8", adjList: [], label: "8", value: 20, type: NodeType.SERVICE },
    ];

    const testCases = [
      ["3", ["2", "3"], "2", ["2"]],
      ["8", ["2", "1", "4", "6", "8"], "2", ["6", "4", "1", "2"]],
      ["2", ["2"], "2", [undefined]],
      ["5", ["2", "3", "5"], "2", ["3", "2"]],
      ["1", ["2", "1"], "2", ["2"]],
    ];

    test.each(testCases)(
      "When starting node id is %p, the resulting branch should be %p",
      (startNodeId, resultingBranch, rootNodeId, parentIdList) => {
        jest
          .spyOn(Utils, "findRootNode")
          .mockReturnValue(mockNodeList[Number(rootNodeId) - 1]);
        const findParentSpy = jest.spyOn(Utils, "findParentNode");
        (parentIdList as string[] | undefined[]).forEach(
          (parentId: string | undefined) => {
            findParentSpy.mockReturnValueOnce(
              mockNodeList[Number(parentId) - 1]
            );
          }
        );

        expect(
          Utils.generateBranch(mockNodeList, startNodeId as string)
        ).toStrictEqual(resultingBranch);
      }
    );
  });
});
