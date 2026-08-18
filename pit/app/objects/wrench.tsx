import Draggable, { DraggableCore, DraggableData } from "react-draggable";
import { ItemProps } from "./item";
import { createRef, useState} from "react";
import { ControlPosition } from "react-draggable";
import Image from "next/image";
import { getAngle } from "./functions";
export default function Wrench({
	width = 100,
	height = 100
} : ItemProps) {
	const ref1 = createRef<HTMLImageElement>();
	const ref2 = createRef<HTMLDivElement>();
	const [rotation, setRotation] = useState<number>(0)
	const [position, setPosition] = useState<ControlPosition>({x:0, y:0})
	function move(event: MouseEvent, data: DraggableData){
    	setPosition({ x: event.x - width / 2, y: event.y - height / 2 });
	}
	function drop(event: MouseEvent, data: DraggableData){
		//check for snapping points
	}
	function rotate(event: MouseEvent, data: DraggableData){
		//track for gameplay positive rotations and negative rotations
		setRotation(getAngle(event.x, event.y, position.x + width / 2, position.y + height / 10)) //turn into rotation matrix based on mouseevent x and y in relation to position
	}
	return (
		<div style={{transformOrigin:`50% 10%`,rotate: `${rotation}deg`, position: "absolute", left: `${position.x}px`, top: `${position.y}px`}}>
			<DraggableCore nodeRef={ref1} onDrag={move}>
				<div ref={ref1}>
					<Image 
						alt={"pizza"}
						draggable="false"
						src={"/vercel.svg"}
						height={height}
						width={width}
						/>
				</div>
			</DraggableCore>
			<DraggableCore nodeRef={ref2} onDrag={rotate}>
				<div ref={ref2} style={{top: "50%"}}>
					<Image 
						alt={"pizza"}
						draggable="false"
						src={"/window.svg"}
						height={height}
						width={width}
						/>
				</div>
			</DraggableCore>
		</div>

		// <Draggable position={position} onStart={dragstart} onStop={dragstop} onDrag={rotate} nodeRef={ref2} axis="none" handle="#wrenchhandle">
		// 	<div ref={ref2} style={{rotate: `${rotation}deg`, transformOrigin: "25% 25%", width: "fit-content", height: "fit-content"}}>
		// 		<Draggable nodeRef={ref1} onDrag={move}>
		// 			<Image 
		// 				ref={ref1}
		// 				draggable="false"
		// 				alt={"wrench trust"}
		// 				src={"/car2.png"}
		// 				width={200}
		// 				height={200}
		// 			/>
		// 		</Draggable>
		// 		<div id="wrenchhandle" style={{position:"absolute", top:"75%", left: "75%"}}>
		// 			<Image 
		// 				draggable="false"
		// 				alt={"wrench handle"}
		// 				src={"/file.svg"}
		// 				width={50}
		// 				height={50}
		// 				/>
		// 		</div>
		// 	</div>
		// </Draggable>
	)
}