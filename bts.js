class Node {
    constructor(data) {
        this.data = data;
        this.left = null; 
        this.right = null;
    }

}

class Tree {
    constructor(array){
        this.array = array;
        this.root = this.#buildTree(array);
    }

    #buildTree() {
        //Set removes duplicates and sort sorts the array
        let uniqueArray = [...new Set (this.array)];
        let sortedArray = uniqueArray.sort((a,b) => a - b);

        function sortedArrayToBSTRecur(arr, start, end) {
            if (start > end) return null;
        
            let mid = start + Math.floor((end - start) / 2);
            let root = new Node(arr[mid]);
        
            // Divide from middle element
            root.left = sortedArrayToBSTRecur(arr, start, mid - 1);
            root.right = sortedArrayToBSTRecur(arr, mid + 1, end);
        
            return root;
          
        }

        return sortedArrayToBSTRecur(sortedArray, 0, sortedArray.length-1);
        
    }

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node === null) return;

        this.prettyPrint(
            node.right,
            `${prefix}${isLeft ? '│   ' : '    '}`,
            false
        );

        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);

        this.prettyPrint(
            node.left,
            `${prefix}${isLeft ? '    ' : '│   '}`,
            true
        );
    }

    includes(value) {
        let tmp = this.root;
        while(tmp!==null) {
            if(tmp.data === value) {
                return true 
            }

            if(value<tmp.data) {
                tmp = tmp.left 

            }else {
                tmp = tmp.right
            }

        }

        return false

    }

    insert(value) {
        let tmp = this.root;
        while(true) {
            if(value === tmp.data) {
                return 
            //if the value is less check to see if next is null, 
            //if so insert node otherwise go to the next node 
            }else if(value<tmp.data) {
                if(tmp.left === null) { 
                    tmp.left = new Node(value)
                    return 
                }else {
                    tmp = tmp.left 
                }
            
            }else if(value>tmp.data) {
                if(tmp.right ===null){
                    tmp.right = new Node(value)
                    return
                }else {
                    tmp = tmp.right
                }
                
            }
        
        }

    }

    deleteItem(value) {
        let tmp = this.root 
        let foundValue; 
        let previousNodePoints;
        let previousNodeValue;
        while (true) {

            if(tmp === null) return 
            
             
            if(value===tmp.data) {

                
                if(tmp === this.root && (tmp.left ===null || tmp.right === null)) {
                    this.root = tmp.left !== null ? tmp.let : tmp.right
                    return 
                }

                foundValue = tmp
                //matches and has two children 
                if(tmp.left !==null && tmp.right !==null) {
                    //go right once 
                    previousNodePoints = "right"
                    tmp = tmp.right;
            
                    //go left until you cannot 
                    //curr is the most leftest node value before null
                    let inOrderSuccessor; 
                    let parentOfSuccessor; 
                    while(tmp.left!==null) {
                        parentOfSuccessor = tmp
                        inOrderSuccessor = tmp.left 
                        previousNodePoints = "left"
                        tmp = tmp.left 
                    }


                    foundValue.data = inOrderSuccessor.data
                    foundValue = inOrderSuccessor
                    previousNodeValue = parentOfSuccessor

 
                
                } 

                //if the left is null, child on right 

                if(foundValue.left ===null) {
                    previousNodeValue[previousNodePoints] = foundValue.right; 
                //if the right is null, child on left 
                } else if (foundValue.right === null ) {
                    previousNodeValue[previousNodePoints] = foundValue.left 
                } else {
                    previousNodeValue[previousNodePoints] = null
                }

                return
               
            }else if(value<tmp.data) {
                previousNodeValue = tmp;
                previousNodePoints = "left"
                tmp = tmp.left 
            }else if(value>tmp.data) {
                previousNodeValue = tmp;
                previousNodePoints = "right"
                tmp = tmp.right
            }
            
        }

    }

    levelOrderForEach(callback) {
        let tmp = this.root
        if(tmp === null) return 
        if(callback && typeof callback === "function" ) {
            let q = []; 
            q.push(tmp)
            while (q.length!==0) {
                let current = q.shift();
                callback(current.data)
                if(current.left !==null) q.push(current.left)
                if(current.right !==null) q.push(current.right)
            }

        }else {
            throw new Error ("Need a callback")
        }
    }

    //root -> left sub-tree -> right sub-tree
    preOrderForEach(callback) {
        if(callback && typeof callback === "function" ) {
            const traverse = function (tmp) {
                if(tmp === null) return 
                callback(tmp.data)
                traverse(tmp.left)
                traverse(tmp.right)
            }
    
            traverse(this.root)
            
        }else {
            throw new Error ("Need a callback")
        }

    }

    //left subtree -> root -> right subtree

    inOrderForEach() {
        if(callback && typeof callback === "function" ) {
            const traverse = function (tmp) {
                if(tmp === null) return 
                traverse(tmp.left)
                console.log(tmp.data)
                traverse(tmp.right)
            }
    
            traverse(this.root)
           
        }else {
            throw new Error ("Need a callback")
        }

    }

    // left subtree -> right subtree -> root 
    postOrderForEach(callback) {
        if(callback && typeof callback === "function" ) {
            const traverse = function (tmp) {
                if(tmp === null) return 
                traverse(tmp.left)
                traverse(tmp.right)
                callback(tmp.data)
            }
    
            traverse(this.root)
           
        }else {
            throw new Error ("Need a callback")
        }

    }


} 



let arr = [12,35,67,8,54]
let tree = new Tree(arr); 
tree.prettyPrint();
//tree.preOrderForEach((value) => console.log(value));
//tree.InOrderForEach();
tree.postOrderForEach((value) => console.log(value));



