import { TrackProp } from "../App";

interface Props {
  tracks: TrackProp[];
  removeTrack: (id: number) => void;
}

const TrackerTable = ({ tracks, removeTrack }: Props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>id</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {tracks &&
          tracks.map((track) => (
            <tr key={track.id}>
              <td>{track.id}</td>
              <td>{track.description}</td>
              <td>{track.amount}</td>
              <td>{track.category}</td>
              <td>
                <button onClick={() => removeTrack(track.id)}>Delete</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TrackerTable;
