import React, { StrictMode, useRef, useState } from 'https://esm.sh/react';
import { createRoot } from 'https://esm.sh/react-dom/client';

createRoot(document.getElementById('root')).render(
	React.createElement(
		StrictMode,
		null,
		React.createElement(CreepyButton, null, 'Creepy Button')
	)
);

function CreepyButton({ onClick, children }) {
	const eyesRef = useRef(null);
	const [eyeCoords, setEyeCoords] = useState({ x: 0, y: 0 });

	const translateX = `${-50 + eyeCoords.x * 50}%`;
	const translateY = `${-50 + eyeCoords.y * 50}%`;

	const eyeStyle = {
		transform: `translate(${translateX}, ${translateY})`,
	};

	const updateEyes = (e) => {
		const userEvent = 'touches' in e ? e.touches[0] : e;

		// get the center of the eyes container and cursor location
		const eyesRect = eyesRef.current?.getBoundingClientRect();
		if (!eyesRect) return;

		const eyes = {
			x: eyesRect.left + eyesRect.width / 2,
			y: eyesRect.top + eyesRect.height / 2,
		};

		const cursor = {
			x: userEvent.clientX,
			y: userEvent.clientY,
		};

		// calculate the eye angle
		const dx = cursor.x - eyes.x;
		const dy = cursor.y - eyes.y;
		const angle = Math.atan2(-dy, dx) + Math.PI / 2;

		// then the pupil distance from the eye center
		const visionRangeX = 180;
		const visionRangeY = 75;

		const distance = Math.hypot(dx, dy);
		const x = (Math.sin(angle) * distance) / visionRangeX;
		const y = (Math.cos(angle) * distance) / visionRangeY;

		setEyeCoords({ x, y });
	};

	return React.createElement(
		'button',
		{
			className: 'creepy-btn',
			type: 'button',
			onClick,
			onMouseMove: updateEyes,
			onTouchMove: updateEyes,
		},
		React.createElement(
			'span',
			{ className: 'creepy-btn__eyes', ref: eyesRef },
			React.createElement(
				'span',
				{ className: 'creepy-btn__eye' },
				React.createElement('span', {
					className: 'creepy-btn__pupil',
					style: eyeStyle,
				})
			),
			React.createElement(
				'span',
				{ className: 'creepy-btn__eye' },
				React.createElement('span', {
					className: 'creepy-btn__pupil',
					style: eyeStyle,
				})
			)
		),
		React.createElement('span', { className: 'creepy-btn__cover' }, children)
	);
}
