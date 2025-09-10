// CSS Modules 
// import styles from './button.module.css'


function Button(){

    // inline styles 
    const styles = {
        backgroundColor: "hsl(200, 100%, 50%)",
        color: "white",
        padding: "10px 20px" ,
        borderRadius: "5px",
        cursor: "pointer",
        border: "none",
    }

    return(<button style={styles}>Click me</button>)
}

export default Button

// 1. External CSS - A separate .css file linked to your React component, where styles are applied using className. Used for global or shared styling.
// CSS Modules - A .module.css file that scopes styles locally to a component, preventing name conflicts by converting class names into unique identifiers.
// 3. Inline Styles - CSS written directly inside a React component as a JavaScript object and passed to the style attribute. Useful for quick, dynamic, or component-specific styling.