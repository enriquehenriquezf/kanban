/**
 * @author Enrique Henriquez Figueroa
 */

/**
 * spacing
*/
export const Spacing = {

    /**
     * Margin size Spacing.
     * @param {String} side side of component to set margin
     * @param {number | string} size size of the margin
     * @returns {Object} margin style object
     */
    m(side: string, size: number | string): object {
        switch (side) {
            case 'x':
                return {marginHorizontal: size === "auto" ? "auto" : 4 * Number(size), marginLeft: size === "auto" ? "auto" : 4 * Number(size), marginRight: size === "auto" ? "auto" : 4 * Number(size)}
            case 'y':
                return {marginVertical: size == "auto" ? "auto" : 4 * Number(size), marginTop: size == "auto" ? "auto" : 4 * Number(size), marginBottom: size == "auto" ? "auto" : 4 * Number(size)}
            case 't':
                return {marginTop: size == "auto" ? "auto" : 4 * Number(size)}
            case 'b':
                return {marginBottom: size == "auto" ? "auto" : 4 * Number(size)}
            case 'l':
                return {marginLeft: size == "auto" ? "auto" : 4 * Number(size)}
            case 'r':
                return {marginRight: size == "auto" ? "auto" : 4 * Number(size)}
            default:
                return {margin: size == "auto" ? "auto" : 4 * Number(size)}
        }
    },

    /**
     * Padding size spacing.
     * @param {String} side side of component to set padding
     * @param {Int} size size of padding
     * @returns {Object} padding style object
     */
    p(side: string,size: number | string): object {
        switch (side) {
            case 'x':
                return {paddingHorizontal: size == "auto" ? "auto" : 4 * Number(size)}
            case 'y':
                return {paddingVertical: size == "auto" ? "auto" : 4 * Number(size)}
            case 't':
                return {paddingTop: size == "auto" ? "auto" : 4 * Number(size)}
            case 'b':
                return {paddingBottom: size == "auto" ? "auto" : 4 * Number(size)}
            case 'l':
                return {paddingLeft: size == "auto" ? "auto" : 4 * Number(size)}
            case 'r':
                return {paddingRight: size == "auto" ? "auto" : 4 * Number(size)}
            default:
                return {padding: 4 * Number(size)}
        }
    }
};
  