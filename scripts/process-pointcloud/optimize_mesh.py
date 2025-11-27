#!/usr/bin/env python3
"""
Optimize mesh by reducing polygon count and smoothing.

Usage:
    python optimize_mesh.py input.obj output.obj --target-triangles 100000
"""

import sys
import argparse
import open3d as o3d


def optimize_mesh(input_path: str, output_path: str, target_triangles: int = 100000):
    """
    Optimize mesh by simplifying and smoothing.

    Args:
        input_path: Path to input mesh file
        output_path: Path to output mesh file
        target_triangles: Target number of triangles
    """
    print(f"Loading mesh from {input_path}...")
    mesh = o3d.io.read_triangle_mesh(input_path)

    original_triangles = len(mesh.triangles)
    print(f"Original mesh: {len(mesh.vertices)} vertices, {original_triangles} triangles")

    # Simplify mesh using Quadric Decimation
    print(f"Simplifying mesh to {target_triangles} triangles...")
    mesh_simplified = mesh.simplify_quadric_decimation(
        target_number_of_triangles=target_triangles
    )

    print(f"Simplified: {len(mesh_simplified.vertices)} vertices, {len(mesh_simplified.triangles)} triangles")
    reduction = (1 - len(mesh_simplified.triangles) / original_triangles) * 100
    print(f"Reduction: {reduction:.1f}%")

    # Optional: Apply Taubin smoothing filter
    print("Applying smoothing filter...")
    mesh_smoothed = mesh_simplified.filter_smooth_taubin(
        number_of_iterations=10
    )

    # Recompute normals
    mesh_smoothed.compute_vertex_normals()

    # Save
    print(f"Saving optimized mesh to {output_path}...")
    o3d.io.write_triangle_mesh(output_path, mesh_smoothed)

    print("Done!")
    print(f"Final mesh: {len(mesh_smoothed.vertices)} vertices, {len(mesh_smoothed.triangles)} triangles")

    return mesh_smoothed


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Optimize mesh by reducing polygon count")
    parser.add_argument("input", help="Input mesh file (OBJ, PLY, etc.)")
    parser.add_argument("output", help="Output mesh file")
    parser.add_argument("--target-triangles", type=int, default=100000,
                        help="Target number of triangles (default: 100000)")

    args = parser.parse_args()

    try:
        optimize_mesh(args.input, args.output, args.target_triangles)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
