import * as THREE from "three/webgpu";
import Transpiler from 'three/addons/transpiler/Transpiler.js';
import ShaderToyDecoder from 'three/addons/transpiler/ShaderToyDecoder.js';
import TSLEncoder from 'three/addons/transpiler/TSLEncoder.js';
import { TSL } from "three/webgpu";

class ShaderToyNode extends THREE.Node {

				constructor() {

					super( 'vec4' );

					this.mainImage = null;

				}

				transpile( glsl, iife = false ) {

					const decoder = new ShaderToyDecoder();

					const encoder = new TSLEncoder();
					encoder.iife = iife;
					encoder.uniqueNames = true;

					const jsCode = new Transpiler( decoder, encoder ).parse( glsl );

					return jsCode;

				}

				parse( glsl ) {

					const jsCode = this.transpile( glsl, true );

					const { mainImage } = eval( jsCode )( TSL );

					this.mainImage = mainImage;

				}

				async parseAsync( glsl ) {

					const jsCode = this.transpile( glsl );
					
					// Create a function from the transpiled code instead of using dynamic import
					const mainImageFunc = new Function('TSL', `
						${jsCode}
						return { mainImage };
					`);
					
					const { mainImage } = mainImageFunc(TSL);
					this.mainImage = mainImage;

				}

				setup( builder ) {

					if ( this.mainImage === null ) {

						throw new Error( 'ShaderToyNode: .parse() must be called first.' );

					}

					return this.mainImage();

				}


			}

            export default ShaderToyNode;