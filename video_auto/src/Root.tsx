import {Composition} from 'remotion';
import { Background } from './Background';

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				// You can take the "id" to render a video:
				// npx remotion render src/index.ts <id> out/video.mp4
				id="HelloWorld"
				component={Background}
				durationInFrames={20 * 30}
				fps={30}
				width={1080}
				height={1920}

				// You can override these props for each render:
				// https://www.remotion.dev/docs/parametrized-rendering

			/>

			{/* Mount any React component to make it show up in the sidebar and work on it individually! */}

		</>
	);
};
