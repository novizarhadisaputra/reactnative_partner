import { create } from "tailwind-rn";
import color from './color.json';
import fonts from './fonts.json';
import shadow from './shadow.json';
import style from './styles.json';

const { tailwind, getColor } = create({ ...fonts, ...color, ...style, ...shadow });
export { tailwind, getColor };
