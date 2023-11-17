on the structure of nodes, it should have subsections similar to blender nodes

these subsections hold:
- 1 piece of data, dataType, filepath to storage, input/output handle
These should populate a side menu for deeper interaction 

## AI prompt module
should have:
    - prompt(s)
        - dynamic array variable/input
    - message chain
    - ai engine
    - cost
    - output
    - saveFile
    - displayed data in properties panel
Side panel should show
    - above data 
    - 

## Architecture
- x

    ### adding a new object
    A new object requires minimal code edits to:
    - app (nodeflow)
    - store -> createNode
    - newObject.tsx
    - NodeSideBar

    ### Properties panel
    Structured via JSON within newObject.tsx
    Basic attributes
    - value
    Advanced attributes

    ### NodeContainer, NodeSection, Node<Type>
    NodeContainer is the top level object that includes the NodeHeader and NodeHooks
    NodeContainer holds NodeSections 
    NodeSections generally have 0-1 input nodes and 0-1 output nodes. It can hold a piece of data.
    There may be specific types of NodeSection such as TextCreator.
    Relevant controls for NodeSection should be within NodeSections. e.g. upload image, slider, etc.
    NodeType defines the logic for a particular type of node. e.g. NodePrompt. 
    NodeType should use the NodeContainer + NodeSection. NodeType should treat each NodeSection as an array as future sections may be of array type.
    NodeType should be easily able to reference the data in each NodeSection.
    NodeSection should be able to hold other NodeSections and display them when expanded.
    Data should be kept in NodeType which interacts with the store.

    ### NodeSection ideas
    - Drag left right to change number
    - On mouseUp to edit number directly
    - Left right arrows on edge to change number
    - expand and collapse

**Use cases**
- AI workflow
- workforce mgt?
- if-then, marketing, HR, etc.