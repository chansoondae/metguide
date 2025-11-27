#!/usr/bin/env python3
"""
Convert point cloud to mesh using Poisson Surface Reconstruction.

Usage:
    python convert_to_mesh.py input.ply output.obj
"""

import sys
import open3d as o3d
import numpy as np


def process_pointcloud(input_path: str, output_path: str):
    """
    Convert point cloud to mesh using Poisson Surface Reconstruction.

    Args:
        input_path: Path to input PLY/PCD file
        output_path: Path to output OBJ file
    """
    print(f"Loading point cloud from {input_path}...")

    # 1. Load point cloud
    pcd = o3d.io.read_point_cloud(input_path)
    print(f"Loaded {len(pcd.points)} points")

    # 2. Downsample (adjust voxel_size for more/less detail)
    print("Downsampling point cloud...")
    pcd_down = pcd.voxel_down_sample(voxel_size=0.02)
    print(f"Downsampled to {len(pcd_down.points)} points")

    # 3. Estimate normals
    print("Estimating normals...")
    pcd_down.estimate_normals(
        search_param=o3d.geometry.KDTreeSearchParamHybrid(
            radius=0.1,
            max_nn=30
        )
    )

    # 4. Orient normals consistently
    print("Orienting normals...")
    pcd_down.orient_normals_consistent_tangent_plane(k=15)

    # 5. Poisson Surface Reconstruction
    print("Performing Poisson surface reconstruction...")
    mesh, densities = o3d.geometry.TriangleMesh.create_from_point_cloud_poisson(
        pcd_down,
        depth=9,
        width=0,
        scale=1.1,
        linear_fit=False
    )
    print(f"Created mesh with {len(mesh.vertices)} vertices and {len(mesh.triangles)} triangles")

    # 6. Remove low-density vertices (noise cleanup)
    print("Removing low-density vertices...")
    densities = np.asarray(densities)
    density_threshold = np.quantile(densities, 0.01)
    vertices_to_remove = densities < density_threshold
    mesh.remove_vertices_by_mask(vertices_to_remove)

    # 7. Clean mesh
    print("Cleaning mesh...")
    mesh.remove_degenerate_triangles()
    mesh.remove_duplicated_triangles()
    mesh.remove_duplicated_vertices()
    mesh.remove_non_manifold_edges()

    # 8. Recompute normals
    mesh.compute_vertex_normals()

    # 9. Save
    print(f"Saving mesh to {output_path}...")
    o3d.io.write_triangle_mesh(output_path, mesh)

    print("Done!")
    print(f"Final mesh: {len(mesh.vertices)} vertices, {len(mesh.triangles)} triangles")

    return mesh


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python convert_to_mesh.py <input.ply> <output.obj>")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]

    try:
        process_pointcloud(input_file, output_file)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
