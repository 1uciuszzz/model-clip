import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";

import { useImmer } from "use-immer";
import { Box3, Vector3, MathUtils } from "three";
import { Brush, Evaluator, INTERSECTION } from "three-bvh-csg";
import { useDispatch, useSelector } from "react-redux";

import { Canvas, useThree } from "@react-three/fiber";
import { CameraControls, Environment } from "@react-three/drei";
import { Box, Button, Slider, Typography } from "@mui/material";

import { clipSlice } from "../stores/clip";
import { Model5 } from "../components/Datangpo";
import kloofendal_43d_clear_puresky_4k from "../assets/kloofendal_43d_clear_puresky_4k.hdr";

const getAllMeshes = (scene) => {
  let meshes = [];
  scene.traverse((child) => {
    if (child.name == "beta3d_mesh") meshes.push(child);
  });
  return meshes;
};

const ClipPlane = forwardRef(function ClipPlane(props, ref) {
  const { scene, controls } = useThree();

  const dispatch = useDispatch();

  const clip = useSelector((state) => state.clip);

  useEffect(() => {
    const meshes = getAllMeshes(scene);
    if (meshes.length == 0) {
      return;
    }
    const box = new Box3();
    meshes.forEach((mesh) => {
      box.union(mesh.geometry.boundingBox);
    });
    controls?.fitToBox(box, true);
    const { min, max } = box;
    const w = max?.x - min?.x;
    const h = max?.y - min?.y;
    const d = max?.z - min?.z;
    dispatch(clipSlice.actions.setWHD({ w, h, d }));
    const center = box.getCenter(new Vector3());
    dispatch(
      clipSlice.actions.setCXYZ({ x: center.x, y: center.y, z: center.z })
    );
    dispatch(
      clipSlice.actions.setXYZ({ x: center.x, y: center.y, z: center.z })
    );
  }, [dispatch, scene, controls]);

  const [clipRes, setClipRes] = useImmer([]);

  const handleClip = () => {
    setClipRes([]);
    const results = [];
    const meshes = getAllMeshes(scene);
    const plane = scene.getObjectByName("beta3d_clip_plane");
    meshes.forEach((mesh) => {
      mesh.geometry.computeVertexNormals();
      const brush1 = new Brush(mesh.geometry);
      brush1.updateMatrixWorld();
      const brush2 = new Brush(plane.geometry);
      brush2.position.set(plane.position.x, plane.position.y, plane.position.z);
      brush2.rotation.set(plane.rotation.x, plane.rotation.y, plane.rotation.z);
      brush2.updateMatrixWorld();
      const evaluator = new Evaluator();
      evaluator.attributes = ["position", "normal"];
      const result = evaluator.evaluate(brush1, brush2, INTERSECTION);
      result.material = mesh.material;
      results.push(result);
    });
    dispatch(clipSlice.actions.setCliped(true));
    setClipRes(results);
  };

  useImperativeHandle(ref, () => {
    return {
      clip: handleClip,
    };
  });

  return (
    <>
      <mesh
        name="beta3d_clip_plane"
        position={[clip.x, clip.y, clip.z]}
        rotation={[
          MathUtils.degToRad(clip.rx),
          MathUtils.degToRad(clip.ry),
          MathUtils.degToRad(clip.rz),
        ]}
      >
        <boxGeometry args={[clip.w / 100, clip.h, clip.d]} />
        <meshBasicMaterial color="#01458e" wireframe />
      </mesh>
      {clip.cliped && (
        <>
          {clipRes.map((brush) => {
            return (
              <mesh
                name="beta3d_mesh"
                key={brush.id}
                geometry={brush.geometry}
                material={brush.material}
              />
            );
          })}
        </>
      )}
    </>
  );
});

const Clip = () => {
  const clipPlane = useRef();

  const dispatch = useDispatch();

  const clip = useSelector((state) => state.clip);

  const handlePosChange = (axis, v) => {
    dispatch(
      clipSlice.actions.setXYZ({
        x: clip.x,
        y: clip.y,
        z: clip.z,
        [axis]: v,
      })
    );
  };

  const handleRotChange = (axis, v) => {
    dispatch(
      clipSlice.actions.setRXYZ({
        x: clip.rx,
        y: clip.ry,
        z: clip.rz,
        [axis]: v,
      })
    );
  };

  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          left: 1,
          top: 1,
          zIndex: 10,
          width: 160,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          backgroundColor: "Background",
          padding: 1,
          margin: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6">X</Typography>
          <Slider
            step={clip.w / 100}
            max={clip.w / 2 + clip.cx}
            min={-clip.w / 2 + clip.cx}
            value={clip.x}
            onChange={(e, v) => handlePosChange("x", v)}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6">Y</Typography>
          <Slider
            step={clip.h / 100}
            max={clip.h / 2 + clip.cy}
            min={-clip.h / 2 + clip.cy}
            value={clip.y}
            onChange={(e, v) => handlePosChange("y", v)}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6">Z</Typography>
          <Slider
            step={clip.d / 100}
            max={clip.d / 2 + clip.cz}
            min={-clip.d / 2 + clip.cz}
            value={clip.z}
            onChange={(e, v) => handlePosChange("z", v)}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6">RX</Typography>
          <Slider
            step={1}
            max={180}
            min={-180}
            value={clip.rx}
            onChange={(e, v) => handleRotChange("x", v)}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6">RY</Typography>
          <Slider
            step={1}
            max={180}
            min={-180}
            value={clip.ry}
            onChange={(e, v) => handleRotChange("y", v)}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6">RZ</Typography>
          <Slider
            step={1}
            max={180}
            min={-180}
            value={clip.rz}
            onChange={(e, v) => handleRotChange("z", v)}
          />
        </Box>
        <Button
          className="w-full"
          variant="contained"
          onClick={() => clipPlane.current.clip()}
        >
          剪切
        </Button>
        <Button
          className="w-full"
          variant="contained"
          onClick={() => {
            dispatch(clipSlice.actions.setCliped(false));
            dispatch(
              clipSlice.actions.setXYZ({ x: clip.cx, y: clip.cy, z: clip.cz })
            );
            dispatch(clipSlice.actions.setRXYZ({ x: 0, y: 0, z: 0 }));
          }}
        >
          重置
        </Button>
      </Box>
      <Canvas camera={{ far: 1000000 }}>
        <CameraControls makeDefault />
        {!clip.cliped && <Model5 />}
        <ClipPlane ref={clipPlane} />
        <Environment
          files={kloofendal_43d_clear_puresky_4k}
          background
          blur={0.5}
        />
      </Canvas>
    </Box>
  );
};

export default Clip;
