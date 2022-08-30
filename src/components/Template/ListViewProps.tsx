export interface ListViewProps {
    isOneOf?: string[]
    onChange: (v: string[]) => void
    onSubmit: () => void
}