export function stringify(...args: any[]): string {
    const result: string[] = [];
    for (let i = 0; i < args.length; i++) {
      result.push(JSON.stringify(args[i], null, 2));
    }
    return result.join('\n');
  }