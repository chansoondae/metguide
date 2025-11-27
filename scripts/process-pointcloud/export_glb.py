#!/usr/bin/env python3
"""
Export mesh to GLB format with Draco compression.

Usage:
    python export_glb.py input.obj output.glb --compress
"""

import sys
import argparse
import subprocess
import os


def export_to_glb(input_path: str, output_path: str, compress: bool = True):
    """
    Export OBJ to GLB format with optional Draco compression.

    Args:
        input_path: Path to input OBJ file
        output_path: Path to output GLB file
        compress: Whether to apply Draco compression
    """
    print(f"Exporting {input_path} to GLB format...")

    # Check if input file exists
    if not os.path.exists(input_path):
        raise FileNotFoundError(f"Input file not found: {input_path}")

    try:
        import trimesh

        # Load mesh with trimesh
        print("Loading mesh with trimesh...")
        mesh = trimesh.load(input_path)

        # Export to uncompressed GLB
        temp_output = output_path.replace('.glb', '_uncompressed.glb')
        print(f"Exporting to {temp_output}...")
        mesh.export(temp_output)

        if compress:
            print("Applying Draco compression with gltf-pipeline...")

            # Check if gltf-pipeline is installed
            try:
                subprocess.run(['npx', 'gltf-pipeline', '--version'],
                               check=True, capture_output=True)
            except (subprocess.CalledProcessError, FileNotFoundError):
                print("Warning: gltf-pipeline not found. Installing...")
                subprocess.run(['npm', 'install', '-g', 'gltf-pipeline'], check=True)

            # Run gltf-pipeline for Draco compression
            subprocess.run([
                'npx', 'gltf-pipeline',
                '-i', temp_output,
                '-o', output_path,
                '--draco.compressionLevel=7'
            ], check=True)

            # Remove uncompressed file
            os.remove(temp_output)
            print(f"Compressed GLB saved to {output_path}")

            # Show file size comparison
            if os.path.exists(output_path):
                size_mb = os.path.getsize(output_path) / (1024 * 1024)
                print(f"File size: {size_mb:.2f} MB")
        else:
            # Just rename the uncompressed file
            os.rename(temp_output, output_path)
            print(f"Uncompressed GLB saved to {output_path}")

        print("Done!")

    except ImportError:
        print("Error: trimesh not installed. Install with: pip install trimesh")
        sys.exit(1)
    except subprocess.CalledProcessError as e:
        print(f"Error running gltf-pipeline: {e}")
        sys.exit(1)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Export mesh to GLB with Draco compression")
    parser.add_argument("input", help="Input mesh file (OBJ)")
    parser.add_argument("output", help="Output GLB file")
    parser.add_argument("--compress", action="store_true", default=True,
                        help="Apply Draco compression (default: True)")
    parser.add_argument("--no-compress", dest="compress", action="store_false",
                        help="Skip Draco compression")

    args = parser.parse_args()

    try:
        export_to_glb(args.input, args.output, args.compress)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
