import { CameraControls, Environment, useGLTF } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import kloofendal_43d_clear_puresky_4k from "../assets/kloofendal_43d_clear_puresky_4k.hdr";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { localModelSlice } from "../stores/localMode";
import { useEffect } from "react";
import { Box3 } from "three";

const ModelList = () => {
  const models = useSelector((state) => state.localModel.models);

  return (
    <Box className="flex flec-col overflow-y-auto overflow-x-hidden h-96">
      {models.map((model) => {
        return (
          <Box key={model.fileName}>
            <Typography variant="h6">{model.fileName}</Typography>
            <Box className="ml-4">
              {model.meshes?.map((mesh) => {
                return <Typography key={mesh.id}>{mesh.name}</Typography>;
              })}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

const getAllMeshes = (obj) => {
  const meshes = [];
  obj.traverse((child) => {
    if (child.isMesh) {
      meshes.push(child);
    }
  });
  return meshes;
};

const GLTF = ({ url }) => {
  const { scene } = useGLTF(url);

  const dispatch = useDispatch();

  const meshes = getAllMeshes(scene).map((mesh) => {
    mesh.userData.type = "beta3d_mesh";
    return mesh;
  });

  useEffect(() => {
    dispatch(
      localModelSlice.actions.setModelMeshes({
        url,
        mehes: meshes.map((mesh) => {
          return {
            id: mesh.id,
            name: mesh.name,
          };
        }),
      })
    );
  }, [dispatch, meshes, url]);

  return (
    <>
      {meshes.map((mesh) => (
        <primitive key={mesh.id} object={mesh} />
      ))}
    </>
  );
};

const Models = () => {
  const models = useSelector((state) => state.localModel.models);

  const { controls, scene } = useThree();

  useEffect(() => {
    const meshes = getAllMeshes(scene).filter(
      (mesh) => mesh.userData.type === "beta3d_mesh"
    );
    if (meshes.length === 0) {
      return;
    }
    const box = new Box3();
    meshes.forEach((mesh) => {
      box.union(mesh.geometry.boundingBox);
    });
    controls?.fitToBox(box, true);
  }, [controls, scene, models]);

  return (
    <>
      {models.map((model) => {
        return <GLTF url={model.url} key={model.url} />;
      })}
    </>
  );
};

const LocalModel = () => {
  const dispatch = useDispatch();

  const handleModel = async () => {
    try {
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          { accept: { "model/gltf-binary": [".glb"] } },
          { accept: { "model/gltf+json": [".gltf"] } },
        ],
      });
      const file = await fileHandle.getFile();
      const url = URL.createObjectURL(file);
      dispatch(
        localModelSlice.actions.apendModel({
          fileName: file.name,
          url,
        })
      );
    } catch (e) {
      return;
    }
  };

  return (
    <Box className="relative h-full">
      <Box className="absolute flex flex-col gap-1 z-10 w-40 bg-gradient-to-br from-white to-blue-400 p-1 m-1">
        <Box className="w-full">
          <Button variant="contained" className="w-full" onClick={handleModel}>
            选择模型文件
          </Button>
        </Box>
        <ModelList />
      </Box>
      <Canvas camera={{ far: 1000000 }}>
        <Models />
        <CameraControls makeDefault />
        <Environment
          files={kloofendal_43d_clear_puresky_4k}
          background
          blur={0.5}
        />
      </Canvas>
    </Box>
  );
};

export default LocalModel;
