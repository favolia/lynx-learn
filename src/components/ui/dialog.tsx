
interface DialogProps {
    onCancel: () => void
    onConfirm: () => void
}

export const Dialog = ({ onCancel, onConfirm }: DialogProps) => {
    return (
        <view
            className="absolute h-full w-full top-0 left-0 flex justify-center items-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
        >
            <view className="max-w-80 w-full min-h-44 bg-white rounded-lg p-4 flex flex-col justify-between items-center">
                <view className="flex flex-col items-center justify-center gap-1">
                    <text className="text-black text-xl font-bold text-center">
                        Yakin ingin hapus?
                    </text>
                    <text className="text-gray-400 text-sm text-center leading-tight">
                        Data ini mungkin tidak akan bisa dikembalikan lagi
                    </text>
                </view>

                <view className="w-full flex justify-between items-end">
                    <view
                        bindtap={onCancel}
                        className="bg-black py-2.5 px-6 rounded-md"
                    >
                        <text className="text-white font-medium">Batal</text>
                    </view>

                    <view
                        bindtap={onConfirm}
                        className="bg-red-500 py-2.5 px-6 rounded-md"
                    >
                        <text className="text-white font-medium">Hapus</text>
                    </view>
                </view>
            </view>
        </view>
    )
}
