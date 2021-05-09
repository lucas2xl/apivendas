import handlebars from 'handlebars';
import fs from 'fs';

interface ITemplateVariable {
  [key: string]: string | number;
}

export interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

class HandleBarsEmailTemplate {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

export default HandleBarsEmailTemplate;
