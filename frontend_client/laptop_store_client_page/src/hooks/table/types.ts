type State = {
    rowSelection: Record<string, boolean>;
};

export type Options<TData> = {
    data: TData[];
    columns: ColDefine<TData>[];
    state: State;
};
export type ColDefine<TData> = {
    header: (props: State) => void;
    cell: (props: State) => void;
};
