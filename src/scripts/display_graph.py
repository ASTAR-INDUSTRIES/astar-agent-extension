import sys
import os
import importlib.util
import traceback


def generate_graph(agent_file, output_file):
    try:
        # Ensure the agent file exists
        if not os.path.exists(agent_file):
            print(f"Agent file {agent_file} not found.")
            return

        # Dynamically import the agent.py module
        spec = importlib.util.spec_from_file_location("agent", agent_file)
        agent_module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(agent_module)

        # Access the 'graph' object from the imported module
        graph = getattr(agent_module, 'graph', None)
        if graph is None:
            print(f"No 'graph' found in {agent_file}.")
            return

        # Generate the PNG image from the graph
        png_data = graph.get_graph(xray=True).draw_mermaid_png()

        # Ensure the output directory exists
        output_dir = os.path.dirname(output_file)
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        # Save the PNG image to the output file
        with open(output_file, 'wb') as file:
            file.write(png_data)

        print(f"Graph image successfully generated at {output_file}")

    except Exception as e:
        print(f"Error: {str(e)}")
        traceback.print_exc()


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python generate_graph.py <agent_file> <output_file>")
    else:
        agent_file = sys.argv[1]
        output_file = sys.argv[2]
        generate_graph(agent_file, output_file)
