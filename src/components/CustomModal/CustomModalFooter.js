import { CustomButton } from 'components';

export const CustomModalFooter = props => {
  const {
    additionalContent,
    okBtnText = 'Ok',
    cancelBtnText = 'Cancel',
    okBtnDisabled = false,
    onOk,
    onCancel,
    type = 'submit',
    loading = false,
    okBtnDisplay = true,
    cancelBtnDisplay = true,
  } = props;

  return (
    <div className="custom-modal-footer">
      {additionalContent}
      {okBtnDisplay && <CustomButton type={type} label={okBtnText} disabled={okBtnDisabled} loading={loading} onClick={onOk} />}
      {cancelBtnDisplay && <CustomButton label={cancelBtnText} onClick={onCancel} color="danger" />}
    </div>
  );
};
