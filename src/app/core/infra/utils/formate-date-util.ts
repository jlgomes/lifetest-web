export function formateDateUtil(str: string): string {
  return new Date(str).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }) + ' ' + str.slice(11);
}
