import { Button, Modal } from 'antd';
import './modal.sass';
import { useSelector } from 'react-redux';
import { IRootStore } from '../../../store';

interface CustomModalProps {
    children?: React.ReactNode;
    onOk: () => void;
    onCancel: () => void;
    saveBtnText?: string;
    cancelBtnText?: string;
    header?: string;
    delBtnText?: string;
    footer?: boolean;
    rootClass?: string;
}

const CustomFooter = ({ onCancel, onOk, delBtnText }: CustomModalProps) => (
    <div className='modalFooter'>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type='primary' onClick={onOk} danger>
            {delBtnText ? delBtnText : 'Delete'}
        </Button>
    </div>
);

const DefaultFooter = ({ onCancel, onOk, saveBtnText, cancelBtnText }: CustomModalProps) => (
    <div className='modalFooter'>
        <Button className='cancelBtnModal' onClick={onCancel}>{cancelBtnText}</Button>
        <Button className='saveBtnModal' type='primary' onClick={onOk}>
            {saveBtnText}
        </Button>
    </div>
);

const CustomModal = ({footer = true, ...props}: CustomModalProps) => {

    // const {isOpen, type} = useModalStore()
    const {isOpen, type} = useSelector((state: IRootStore) => state.modal)

    return (
        <Modal
            className={`customModal ${props.rootClass}`}
            open={isOpen}
            onOk={props.onOk}
            onCancel={props.onCancel}
            okText={props.saveBtnText}
            cancelText={props.cancelBtnText}
            destroyOnClose
            footer={
                footer ? (
                    type === 'del' ? <CustomFooter {...props} /> : <DefaultFooter {...props} />
                ) : null
            }
        >
            {!(type === 'del') && (
                <div className='modalHeader'>
                    <div className='headerContent'>{props.header}</div>
                </div>
            )}
            {type === 'del' ? (
                <div className='modalDel'>
                    <p>Are you sure?</p>
                </div>
            ) : (
                <div className='modalContent'>{props.children}</div>
            )}
        </Modal>
    );
};

export default CustomModal;