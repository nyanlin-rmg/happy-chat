const ConfirmModal = ({title, description, confirm, cancel}) => {
    return (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle show">
            <div className="modal-box bg-slate-700">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{description}</p>
                <div className="modal-action">
                    <button className="btn btn-neutral" onClick={confirm}>Okay</button>
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )    
}

export default ConfirmModal;