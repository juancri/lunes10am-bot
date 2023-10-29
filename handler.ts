
import fs from "fs/promises";

import { createRestAPIClient } from "masto";

const API_URL = 'https://lile.cl';
const ACCESS_TOKEN = process.env['ACCESS_TOKEN'];
const VIDEO_FILE_PATH = './files/video.mp4';

export async function run()
{
	try
	{
		// Create mastodon client
		const client = createRestAPIClient({
			url: API_URL,
			accessToken: ACCESS_TOKEN as string,
		});

		// Upload video
		const videoContents = await fs.readFile(VIDEO_FILE_PATH);
		const videoBlob = new Blob([videoContents]);
		const media = await client.v2.media.create({
			file: videoBlob
		});

		// Post
		const status = await client.v1.statuses.create({
			visibility: "public",
			mediaIds: [media.id],
			language: 'es'
		});

		// Done!
		console.log(status.url);
	}
	catch (error) {
		console.error(error);
	}
}
