static Node deleteLeaf(Node root, int x)
{
    if (root == null)
        return null;
    root.left = deleteLeaf(root.left, x);
    root.right = deleteLeaf(root.right, x);
 
    if (root.data == x && root.left == null && root.right == null) {
 
        return null;
    }
    return root;
}
 

