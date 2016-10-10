export interface ToDo {
    $key: string;
    index: number;
    name: string;
    description?: string;
    isComplete: boolean;
    // sync flags.
    _isDirty?: boolean;
    _isCreated?: boolean;
    _isRemoved?: boolean;
    _isUpdated?: boolean;
}
