export default function codeCreator(startingCode: string, middleCode: string, endCode: string): string {
  return `
   ${startingCode}

   ${middleCode}

   ${endCode}
  `;
}

/**
 * for python -> end code = emptyString
 * for java -> end code = emptyString
 */
