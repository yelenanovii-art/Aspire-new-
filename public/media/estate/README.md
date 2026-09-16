# Real estate and yachting media

Drop photos and video here, then set `src` on the matching entry in
`src/data/verticals.js` (the `gallery` array and the `film` object).

`src` is relative to this folder, e.g. `src: '/media/estate/hero-interior.jpg'`.

Until a file is set, the page renders an intentional placeholder frame stating
what belongs there and the crop to shoot for, so the page can be shown to a
client before the shoot has happened. Nothing appears broken.

Video is detected from the extension (.mp4, .webm, .mov) and plays muted,
looping and inline. Give a video a `poster` image too so the first frame is not
blank while it loads.

Slots currently defined:

| id              | what            | crop                |
|-----------------|-----------------|---------------------|
| hero-interior   | Hero interior   | landscape 2400x1600 |
| exterior-drone  | Drone exterior  | landscape 2400x1600 |
| detail          | Detail shot     | portrait 1600x2000  |
| yacht-deck      | Yacht, on deck  | landscape 2400x1600 |
| yacht-interior  | Yacht interior  | portrait 1600x2000  |
| walkthrough     | Cinematic film  | 16:9, 1920x1080     |
