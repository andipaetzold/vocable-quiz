import CreateSubject from "./CreateSubject";
import SubjectList from "./SubjectList";

export default function Edit() {
    return (
        <>
            <div style={{ marginBottom: "20px" }}>
                <SubjectList />
            </div>
            <CreateSubject />
        </>
    );
}
